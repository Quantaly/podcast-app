export interface Podcast {
    title: string,
    items: PodcastItem[],
    imageUrl?: string,
}

export interface PodcastItem {
    title: string,
    link?: string,
    url: string,
    type?: string,
}
