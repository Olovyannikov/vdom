export const api = {
    get(url) {
        switch (url) {
            case '/lots':
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve([
                            {
                                id: 1,
                                name: 'Apple',
                                description: 'Apple description',
                                price: 16,
                                favorite: true
                            },
                            {
                                id: 2,
                                name: 'Orange',
                                description: 'Orange description',
                                price: 41,
                                favorite: false
                            }
                        ])
                    }, 1000)
                })
            default:
                throw new Error('Unknown address')
        }
    },
    post(url) {
        if (/^\/lots\/(\d+)\/favorite$/.exec(url)) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({})
                }, 500)
            })
        }
        if (/^\/lots\/(\d+)\/unfavorite$/.exec(url)) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({})
                }, 500)
            })
        }
        throw new Error('Wrong address')
    }
}

export const stream = {
    subscribe(channel, listener) {
        const match = /price-(\d+)/.exec(channel)
        if (match) {
            setInterval(() => {
                listener({
                    id: parseInt(match[1]),
                    price: Math.round((Math.random() * 10 + 30))
                })
            }, 1000)
        }
    }
}

export const isFav = (lot) => lot?.favorite;
