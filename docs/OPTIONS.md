## Plugin options

| Option                |Type        | Required | Default value  | Description                                                           |
| --------------------- |------------|----------|----------------|-----------------------------------------------------------------------|
| `outputDir`           |`string`    |false     | regression     | Working directory. Images, report, etc will be saved into this folder |
| `instanceFolder`      |`Function`  |false     | undefined      | Callback to create folder by specific browser. See details below      |
| `customMatchers`      |`Function[]`|false     | [ ]            | Add custom matchers to webdriverio                                    |
| `largeImageThreshold` |`number`    |false     | 1200           | Skips pixels when the image width or height is larger than this one   |
| `allowedMismatch`     |`number`    |false     | 0.1            | Ignore failed result if mismatch percentage less than allowed         |
| `initiateExpectedImage` |`boolean` |false     | true           | Use actual image if no expected image is provided; returns mismatch positive infinity if set to false |

#### instanceFolder

This option allow to provide custom folder name per each browser. The callback must return folder name as string. For example:

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
