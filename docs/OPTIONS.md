## Plugin options

| Option                |Type      | Required | Default value  | Description                                                           |
| --------------------- |----------|----------|----------------|-----------------------------------------------------------------------|
| `folder`              |`boolean` |false     | regression     | Working directory. Images, report, etc will be saved into this folder |
| `customMatchers`      |`string[]`|false     | [ ]            | Register your custom matchers to include it for output report         |
| `largeImageThreshold` |`number`  |false     | 1200           | Skips pixels when the image width or height is larger than this one   |
