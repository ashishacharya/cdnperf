# CDNperf

CDNperf monitors popular CDN sites and graphs this data.

## Development

1. `npm install`
2. `cd config`
3. `cp config.template.js config.js` and adjust as needed
4. `james` to invoke the build tool (`npm install james -g` to install it)

## Hosting

1. Set NODE\_ENV to 'production' (important as this enables view caching!)
2. Run the app on top of `forever` or similar

If you are running on Heroku, remember to set environment variables as documented on conf.js. See also [their documentation](https://devcenter.heroku.com/articles/nodejs) on the topic.
