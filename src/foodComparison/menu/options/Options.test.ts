import { createGroupedOptions } from "./Options";

describe('foodComparison/Menu/Options', () => {
  it('createGroupedOptions builds the grouped Options', () => {
    const items = {
      "fruits": ["apple", "red orange"],
      "vegetables": ["potato", "carrot"],
    }

    const expected =  [
      {
        "label": "Fruits",
        "options": [
          {
            "label": "Apple",
            "value": "apple"
          },
          {
            "label": "Red Orange",
            "value": "red orange"
          }
        ]
      },
      {
        "label": "Vegetables",
        "options": [
          {
            "label": "Potato",
            "value": "potato"
          },
          {
            "label": "Carrot",
            "value": "carrot"
          }
        ]
      }
    ]

    expect(createGroupedOptions(items)).toMatchObject(expected)
  })
})