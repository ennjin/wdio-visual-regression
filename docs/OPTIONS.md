## Plugin options

| Option                |Type      | Required | Default value  | Description                                                           |
| --------------------- |----------|----------|----------------|-----------------------------------------------------------------------|
| `outputDir`           |`string`  |false     | regression     | Working directory. Images, report, etc will be saved into this folder |
| `customMatchers`      |`string[]`|false     | [ ]            | Register your custom matchers to include it for output report         |
| `largeImageThreshold` |`number`  |false     | 1200           | Skips pixels when the image width or height is larger than this one   |
| `instanceFolder`      |`Function`|false     | undefined      | Callback to create folder by specific browser. See details below      |


#### instanceFolder

This option allow to provide custom folder name to each browser. The callback must return custom folder name as string. For example:

```ts
instanceFolder: info => {
  const [ version ] = info.browserVersion.split('.');
  return `${ info.browserName }_${ version }`;
}
```

The callback's argument contain the following properties:

```ts
interface BrowserInfo {
  browserName?: string;
  browserVersion?: string;
  platform?: string;
}
```
