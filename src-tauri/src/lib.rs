// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::fs;
use std::fs::File;
use std::io::Read;
// use std::fs::Metadata;
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

// Ця функція дістає назви всіх файлів у директорії і повертає їх у вигляді вектора (масиву).
#[tauri::command]
fn get_filenames_in_directory(path: String) -> Vec<FileMetadata> {
    let mut files_metadata: Vec<FileMetadata> = Vec::new();

    if let Ok(entries) = fs::read_dir(&path) {
        for entry in entries {
            if let Ok(entry) = entry {
                if let Ok(file_name) = entry.file_name().into_string() {
                    // Фільтруємо файл `.DS_Store`
                    if file_name == ".DS_Store" {
                        continue;
                    }

                    let metadata = entry.metadata().unwrap();

                    let modified = metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH);
                    let duration_since_epoch = modified
                        .duration_since(UNIX_EPOCH)
                        .unwrap_or_default()
                        .as_secs();

                    files_metadata.push(FileMetadata {
                        name: file_name,
                        size: metadata.len(),
                        modified: duration_since_epoch,
                        is_dir: metadata.is_dir(),
                        extension: entry.path().extension().and_then(|e| e.to_str().map(String::from)),
                        directory_path: path.clone(),
                    });
                }
            }
        }
    }

    // Сортуємо файли: спочатку директорії, потім файли, і все за алфавітом
    files_metadata.sort_by(|a, b| {
        if a.is_dir && !b.is_dir {
            std::cmp::Ordering::Less
        } else if !a.is_dir && b.is_dir {
            std::cmp::Ordering::Greater
        } else {
            a.name.to_lowercase().cmp(&b.name.to_lowercase())
        }
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
        .invoke_handler(tauri::generate_handler![get_filenames_in_directory, get_file_content])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
