export default {
    name: 'video',
    title: 'Video',
    type: 'object',
    fields: [
        {
            name: 'url',
            title: 'YouTube URL',
            type: 'url',
            validation: (Rule: any) => Rule.required().custom((url: string) => {
                const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
                if (!youtubeRegex.test(url)) {
                    return 'Please enter a valid YouTube URL'
                }
                return true
            })
        },
        {
            name: 'title',
            title: 'Video Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Video Description',
            type: 'text',
            rows: 3,
        }
    ],
    preview: {
        select: {
            title: 'title',
            url: 'url'
        },
        prepare({ title, url }: { title?: string; url?: string }) {
            return {
                title: title || 'Untitled Video',
                subtitle: url
            }
        }
    }
} 