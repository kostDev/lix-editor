

export interface ResFileMetadata  {
  name: string;
  size: number;
  modified: number;
  is_dir: boolean;
  extension?: string | null;
  path: string;
}

export interface FileMetadata  {
  name: string,
  size: number,
  modified: number,
  is_dir: boolean,
  formattedSize: string,
  formattedModified: Date,
  extension?: string | null;
  path: string;
}

export type FileContent = string;
