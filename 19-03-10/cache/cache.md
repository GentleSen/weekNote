### 缓存
基本网络请求： 请求 => 处理 => 响应
后端缓存主要集中在 **响应** 部分。
前端缓存主要就是剩下的 **请求** 响应部分。
前端缓存按照缓存位置分为memary cache,disk cache。

> memaryCache 不受开发者控制，也不受http协议头的约束。
> ServiceWorder 是有开发者编写的额外脚本，缓存位置独立，但出现的比较晚，应用还不算太广泛。
> diskCache （httpCache）遵守http 协议头中的字段。


浏览器获取资源的优先级：
    1. Service Worker
    2. Memory Cache
    3. Disk Cache
    4. 网络请求


memary cache: 
    1. 几乎所有的资源都会被浏览器自动加入到memaryCache中。
    2. 资源数量很多但浏览器内存大小有限制,故maearyCache是短期存储。
    3. 浏览器的tab关闭后，memaryCache便会失效。如果一个页面资源量过多，则有可能在tab没关闭之前前面的缓存就已经失效了。
>  memaryCache 保证了一个页面中如果有两个url和类型相同的请求,浏览器只会请求一次。在从memaryCache中读取缓存时，浏览器会忽视max-age,no-cache等头部配置。如果不期望资源走memary缓存的话需要设置 no-store 。

disk cache 又分为 强缓存（强制缓存） 跟 协商缓存（对比缓存）

##### 强缓存:  
强缓存直接减少请求数，是提升最大的缓存策略，应优先考虑强缓存。 
字段名： cache-control 和 expires。

**expires**: http1.0 的字段,表示缓存的到期时间（当地时间 + 缓存时间）
缺点: 
    1. 因为是绝对时间，用户本地时间发生变化或者服务器时间发生变化都可能导致缓存失效。
    2. 写法复杂，采用表示时间的字符串。例:
        Expires: Thu, 10 Nov 2017 08:45:11 GMT 

**cache-control**: http 1.1的字段，表示资源缓存的最大有效时间。
cache-control 常用值:
1. max-age: 最大有效时间
2. must-revalidate: 如果超过max-age时间，则必须向服务器发送请求，验证资源是否有效。
3. no-cache: 实际情况仍然会走缓存，是否使用这个内容由后续的对比来决定。
4. no-store: 不做任何缓存
5. public: 所有的内容都可以被缓存
6. private: 所有的内容只有客户端才可以缓存,代理服务器不做缓存。

> 在http1.1 之前,使用no-cache,通常使用pragma字段，例 pragma: no-cache.但是这并不是一种规范，只是浏览器约定成俗的实现。


##### 对比缓存（协商缓存）:
当强制缓存失效时,还可以使用对比缓存来减少网络请求响应包的大小。
字段名: 
**Last-Modified & If-Modified-Since**
**Etag & If-None-Match**

> 浏览器第一次获取数据时,服务端会返回数据以及缓存标识，当之后再次访问时，浏览器会用缓存标识去请求服务器，若数据没变化，则服务器http状态码304，客户端继续使用缓存。如果失效，服务器会返回新的数据和缓存标识。
> 对比缓存并没有减少请求的数量，只是减少了服务器返回数据的大小。
> 对比缓存可以和强制缓存一起使用，作为强制缓存失效之后的一种后备方案。

**last-modified & If-Modified-Since：** 服务器通过 last-modified 来告知客户端资源最后一次被修改的时间。浏览器第二次请求资源的时候会在请求头中带上 if-modified-since 字段,值为服务器返回的last-modified的值。服务器会将if-modified-since的值与服务器中的last-modified相比较，如果相等就返回304，如果不相等则返回200.


**etag & if-none-match：** etag存储的是资源的特殊标识，一般都是hash生成的，服务器中存着资源的etag字段。前端第一次请求资源服务器会把资源和etag字段返回给前端。之后前端请求数据时,返回if-none-match字段,值为服务器返回的etag的值。服务器会将if-none-match的值与服务器中的etag的值相比较，如果相等返回304，不相等返回200.
