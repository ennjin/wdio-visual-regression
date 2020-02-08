### How to create custom matcher

Follow to this few simple steps for creating your own matcher method.

1. Import `Macther` class
```typescript
import { Macther } from 'wdio-visual-regression'; 
```
2. Extend new class from `Matcher` and override `takeScreenshot` method
```typescript
class MyAwesomeMatcher extends Macther {
    async takeScreenshot(): Promise<Buffer> {
        // do logic
    }
}
```
**Important:** `takeScreenshot` method must return promise of buffer

3. Register custom macther in `before` config hook
```js
const { MyAwesomeMatcher } = require('./my-awesome-macther');

exports.config = {
    // other configuration
    before: () => {
        browser.addCommand('matchAwesome', (name: string) => {
            const myAwesomeMatcher = new MyAwesomeMatcher();
            return myAwesomeMatcher.match(name);
        }
    }
}
```

For more details see source code of [available matchers](../packages/service/matchers).