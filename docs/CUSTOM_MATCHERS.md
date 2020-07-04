### How to create custom matcher

Follow to this few simple steps for creating your own matcher method.

Since version 1.3.0 there is new decorators API for creating custom matchers.
Important! Old implementation of base class still available but is deprecated and not recommended for usage.
It's can be mixed but this also not recommended! Base class will be removed in next major release.
For more details take a look at [available matchers](../packages/service/matchers).

#### New decorators API
1. Using `defineMatcher` decorate function
```typescript
import { defineMatcher } from 'wdio-visual-regression'; 

// name is required
@defineMatcher({ name: 'myAwesomeMatcher' })
export class MyAwesomeMatcher {
    // takeScreenshot is required
    async takeScreenshot(): Promise<Buffer> {
        // do logic
    }
}
```

2. Add the class to service options
```typescript
const { MyAwesomeMatcher } = require('./my-awesome-matcher');

exports.config = {
    // other configuration
    services: [
        [VisualRegression, {
            customMatchers: [MyAwesomeMatcher]
        }]
    ]
}
```

#### Old base class implementation

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
