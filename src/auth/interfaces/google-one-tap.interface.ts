export interface GoogleOneTapProfile {
    id: string;
    displayName: string;
    name: ProfileName;
    provider: string,
    emails: ProfileEmails[],
    photos: PhotosProfile[]
  }

  export interface ProfileName {
    familyName: string;
    givenName: string;
  }

  export interface ProfileEmails{
    value: string;
  }

  export interface PhotosProfile {
    value: string;
  }