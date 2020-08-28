export default {
    methods: {
        capitalizePhrase(phrase, locale = navigator.language) {
            return phrase
                .toLocaleLowerCase(locale)
                .split(' ')
                .map(
                    word =>
                    word.charAt(0).toLocaleUpperCase(locale) + word.slice(1)
                )
                .join(' ')
        },
    },
}