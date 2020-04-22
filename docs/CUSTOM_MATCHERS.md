### How to create custom matcher

Follow to this few simple steps for creating your own matcher method.

1. Import `Matcher` class
```typescript
import { Matcher } from 'wdio-visual-regression'; 
```
2. Extend new class from `Matcher` and override `takeScreenshot` method
```typescript
class MyAwesomeMatcher extends Matcher {
    async takeScreenshot(): Promise<Buffer> {
        // do logic
    }
}
```
**Important:** `takeScreenshot` method must return image as `Promise<Buffer>` type

3. Register custom matcher
```js
const { MyAwesomeMatcher } = require('./my-awesome-matcher');

exports.config = {
    // other configuration
    before: () => {
        browser.addCommand('matchAwesome', (name: string) => {
            const myAwesomeMatcher = new MyAwesomeMatcher();
            return myAwesomeMatcher.match(name);
        }
    },
    services: [
        [VisualRegression, {
            customMatchers: ['matchAwesome']
        }]
    ]
}
```

For more details take a look at [available matchers](../packages/service/matchers).
