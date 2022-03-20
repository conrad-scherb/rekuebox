export interface Xml {
    version: string;
    encoding: string;
}

export interface Product {
    Name: string;
    Version: string;
    Company: string;
}

export interface Track {
    TrackID: string;
    Name: string;
    Artist: string;
    Composer: string;
    Album: string;
    Grouping: string;
    Genre: string;
    Kind: string;
    Size: string;
    TotalTime: string;
    DiscNumber: string;
    TrackNumber: string;
    Year: string;
    AverageBpm: string;
    DateAdded: string;
    BitRate: string;
    SampleRate: string;
    Comments: string;
    PlayCount: string;
    Rating: string;
    Location: string;
    Remixer: string;
    Tonality: string;
    Label: string;
    Mix: string;
    TEMPO: Tempo[];
    POSITION_MARK: PositionMark[];
}

export interface Tempo {
    Inizio: string;
    Bpm: string;
    Metro: string;
    Battito: string;
}

export interface PositionMark {
    Name: string;
    Type: string;
    Start: string;
    Num: string;
    Red: string;
    Blue: string;
    Green: string;
}

export interface Collection {
    TRACK: Track[];
    Entries: string;
}

export interface PlaylistTrack {
    Key: string;
}

export interface PlaylistNode {
    Name: string;
    Type: string;
    KeyType: string;
    Entries: string;
    TRACK: PlaylistTrack[];
    Count?: string;
}

export interface PlaylistFolderNode {
    NODE: PlaylistOrFolderNode[];
    Type: string;
    Name: string;
    Count: string;
}

export type PlaylistOrFolderNode = PlaylistNode | PlaylistFolderNode;

export interface Playlists {
    NODE: PlaylistFolderNode[];
}

export interface DJPlaylists {
    PRODUCT: Product;
    COLLECTION: Collection;
    PLAYLISTS: Playlists;
    Version: string;
}

export interface RekordboxXmlJson {
    xml: Xml;
    DJ_PLAYLISTS: DJPlaylists;
}
