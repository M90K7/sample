# `NextJS` IIS Publish

## Build your next-js app

### 1) cmd > `next build && next export`

> nextjs create `out` folder and update `.next`/server folder

---

## Config IIS server

### 1) install `IISNode` and `URLRewrite` module

### 2) Set the permissions on whole folder to be read/write to IIS_IUSRS

### 3) Add package.json file and `npm install`

### 4) Copy dist `out` contains files to `root` folder then copy `.next` folder to `root` folder

### 5) If use `prisma-js` copy `.prisma` folder at `node_modules`

### 6) Copy `.env` file to `root` folder

---

### Create `app.js` file

```js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = false; //process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
  }).listen(process.env.PORT || 3000, "0.0.0.0", (err) => {
    if (err) throw err
    console.log('> Ready on http://xyz.com/')
  })
})
```

---

### config web.config file

```xml
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="app.js" verb="*" modules="iisnode" />
    </handlers>
    <iisnode loggingEnabled="true" debuggingEnabled="false"/>
    <rewrite>
      <rules>
        <rule name="app" patternSyntax="Wildcard">
          <match url="*"  />
          <action type="Rewrite" url="app.js" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

---

### config .env file

```yaml
NEXTAUTH_URL=http://xyz.com/
```
