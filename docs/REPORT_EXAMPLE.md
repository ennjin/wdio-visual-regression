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
    "passed": true,
    "testName": "Should check element"
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
    "passed": false,
    "testName": "Should check viewport"
  }
]
```