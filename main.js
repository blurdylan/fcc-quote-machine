/*jshint esversion: 6 */

//quote-machine component creation
Vue.component('quote-machine', {
    data: () => ({
        //color palette to randomize color changes
        colors: ['#093145', '#107896', '#829356', '#C2571A', '#9A2617', '#BCA136', 'black', 'red', 'blue', 'orange'],
        quotes: '',
        author: '',
        twitter: '',
        activeColor: '',
        opacityQ: '1',
        errors: []
    }),

    // Vue Template for the quote-machine component
    template: `
    <div class="card">
            <div class="card-content">
                <p class="title" :style="{color: activeColor , opacity: opacityQ}">
                <i class="fa fa-quote-left" aria-hidden="true"></i>
                    <p class="title" :style="{color: activeColor, opacity: opacityQ}">{{ quotes }}</p>
                </p>
                <p class="subtitle" :style="{color: activeColor , opacity: opacityQ}">
                    - {{ author }}
                </p>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item" @click="getQuote">
                    Another One 👌
                </a>
                <a :href="twitter" class="card-footer-item">
                    Share on Twitter &nbsp; <i class="fa fa-twitter" aria-hidden="true"></i>
                </a>
            </footer>
        </div>
    `,

    // On mounting of the component (when it is initalized)
    mounted() {
        //Get the quotes one by one from the api
        axios.get("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1")
            .then(response => {
                this.quotes = $(response.data[0].content).text();
                this.author = response.data[0].title;
            }).catch(e => {
                this.errors.push(e);
            });
        //Active color
        this.activeColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    },

    methods: {
        // Get quote method from quotesondesign api
        getQuote: function () {
            this.opacityQ = '0';
            axios.get("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1")
                .then(response => {
                    this.quotes = $(response.data[0].content).text();
                    this.author = response.data[0].title;
                    //Fade animation for quotes
                    this.opacityQ = '1';
                }).catch(e => {
                    this.errors.push(e);
                });
            //Change the active color
            this.activeColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        }
    },

    watch: {
        // whenever a the quote changes, this function will run which helps to build the api interaction link
        quotes: function (newQuote) {
            this.twitter = 'https://twitter.com/intent/tweet?hashtags=quotes' + '&related=freecodecamp' + '&text=ʻʻ' + this.quotes + 'ʼʼ by ' + this.author;
        }
    }

});

//Initialize Vue framework
new Vue({
    el: '#root',
});