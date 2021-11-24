module.exports = {
    purge: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/tailwind.components/**/*.{js,ts,jsx,tsx}',
        './src/layouts/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                yyy: { // bg-yyy-yellow
                    'yellow': '#F39800',

                    'd_container': '#0e0e10',
                    'd_head': '#18181b',
                    'd_nav': '#1f1f23'
                },
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
