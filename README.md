# Demos for Cloudflare Workers

[Cloudflare Workers](https://workers.cloudflare.com) are brilliant! In other news, _I love Cloudflare <3_

Workers let you do _edge logic_ which means:

- You can do things with your code before even hitting any other servers
- It's very fast since the compute happens at one of Cloudflare's almost 200 data centers (probably very close to you!)
- Frankly you can do lots of things with it since it's just plain JavaScript!
- But my favorite: It gives you some of those "server"ful headers and things back to any of your serverless implementations

On Cloudflare, these serverless edge functions are also extremely fast (according to them, up to 50x faster). Having worked quite a bit with serverless across the big three providers, I can attest that Cloudflare Workers are the fastest you will get if you need serverless compute.

## Use cases

I can imagine a LOT of use cases, but for my part I'm seeing these in particular:

- As a complete, serverless backend for low-compute purposes (push something to a database, add a user, send email...)
- As an extremely lightweight webserver
- As a way to proxy other, "real" webservers and giving them edge-side headers (like country, device and checking if they are a bot) before actually rendering them — _still testing this out_

## Limitations

There's a few limitations as well:

- The free plan supports up to 10ms of compute; paid plan does 50ms; you don't have a lot of time to operate with
- If you use Serverless Framework, that plugin may still be wonky for the `.dev` sites (the ones you get out of the box)

## How to use the code

You will have to have a [Cloudflare account (free)](https://workers.cloudflare.com) and you can get the regular Workers plan for free as well. You receive a free `{DOMAIN}.workers.dev` domain where the functions will be hosted.

You could use Serverless Framework to deploy code, but the absolutely easiest is just logging in to Cloudflare and using the panels. Note that Safari is not fully supported, but Chrome works just fine, if you intend to use the inline coding and preview functionality.

## Similar products

- [Akamai EdgeWorkers](https://developer.akamai.com/akamai-edgeworkers-overview)
- [Amazon Web Services Lambda@Edge](https://aws.amazon.com/lambda/edge/)
- [IBM CIS Edge Functions](https://cloud.ibm.com/docs/infrastructure/cis?topic=cis-edge-functions)

## References

- [Cloudflare Workers, Template Gallery](https://developers.cloudflare.com/workers/templates/)