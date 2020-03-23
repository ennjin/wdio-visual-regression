#### Report examaple

```json
[
  {
    "matchers": [
      {
        "mismatch": 0,
        "fileName": "element.png",
        "files": {
          "actual": "/path/to/element.png",
          "expected": "/path/to/element.png"
        }
      }
    ],
    "testName": "Should check element",
    "passed": true,
    "browser": "chrome_80_Linux"
  },
  {
    "matchers": [
      {
        "mismatch": 2.5,
        "fileName": "viewport.png",
        "files": {
          "actual": "/path/to/viewport.png",
          "expected": "/path/to/viewport.png",
          "diff": "/path/to/viewport.png"
        }
      }
    ],
    "testName": "Should check viewport",
    "passed": false,
    "browser": "chrome_80_Linux"
  }
]
```