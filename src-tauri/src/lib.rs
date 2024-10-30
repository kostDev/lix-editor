//API Tauri commands at https://tauri.app/develop/calling-rust/
use std::fs::{File, read_dir};
use std::io::Read;
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(serde::Serialize)]
struct FileMetadata {
    name: String,
    size: u64,
    modified: u64,
    is_dir: bool,
    extension: Option<String>,
    directory_path: String,
}

const HIDDEN_FILES: [&str;1] = [".DS_Store"];

// Ця функція дістає назви всіх файлів у директорії і повертає їх у вигляді вектора (масиву).
#[tauri::command]
fn get_filenames_in_dir(path: String) -> Vec<FileMetadata> {
    let mut files_metadata: Vec<FileMetadata> = Vec::new();

    if let Ok(entries) = read_dir(&path) {
        entries.filter_map(Result::ok).for_each(|entry| {
            if let Ok(filename) = entry.file_name().into_string() {
                if !HIDDEN_FILES.contains(&filename.as_str()) {
                    let metadata = entry.metadata().unwrap();
                    let modified = metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH);
                    files_metadata.push(FileMetadata {
                        name: filename,
                        size: metadata.len(),
                        modified: modified.duration_since(UNIX_EPOCH).unwrap_or_default().as_secs(),
                        is_dir: metadata.is_dir(),
                        extension: entry.path().extension().and_then(|e| e.to_str().map(String::from)),
                        directory_path: path.clone(),
                    });
                }
            }
        });
    }

    files_metadata.sort_by(|a, b| match (a.is_dir, b.is_dir) {
        (true, false) => std::cmp::Ordering::Less,
        (false, true) => std::cmp::Ordering::Greater,
        _ => a.name.to_lowercase().cmp(&b.name.to_lowercase()),
    });

    files_metadata
}

#[tauri::command]
fn get_file_content(directory: String, file_name: String) -> Option<String> {
    let file_path = format!("{}/{}", directory, file_name);

    let mut file = File::open(file_path).ok()?;
    let mut file_content = String::new();

    if file.read_to_string(&mut file_content).is_ok() {
        Some(file_content)
    } else {
        None
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_filenames_in_dir, get_file_content])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
