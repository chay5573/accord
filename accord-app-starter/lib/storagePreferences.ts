export type FileDestination = 'accord_cloud' | 'onedrive' | 'local_export';

export interface StoragePreference {
  id: string;
  workspaceId: string;
  defaultDestination: FileDestination;
  folderNamingConvention: string;
  localExportMode: 'download' | 'browser_folder_picker' | 'desktop_companion_future';
  oneDriveStatus: 'not_connected' | 'mock_placeholder' | 'connected';
  accordCloudStatus: 'mock_enabled' | 'enabled' | 'disabled';
}

export const mockStoragePreference: StoragePreference = {
  id: 'storage-pref-red-rock',
  workspaceId: 'workspace-red-rock',
  defaultDestination: 'accord_cloud',
  folderNamingConvention: '{client-last-name}/{property-address}/{transaction-stage}',
  localExportMode: 'desktop_companion_future',
  oneDriveStatus: 'mock_placeholder',
  accordCloudStatus: 'mock_enabled'
};
