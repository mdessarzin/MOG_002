// https://scotch.io/tutorials/build-a-mobile-app-with-angular-2-and-ionic-2

import { Injectable } from '@angular/core';

/*
  Generated class for the Menu provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MenuService {
  constructor() {}

  // Should be an API call
  getAll() {
    return [
      {
        name: "Electronics",
        id: 4,
        items: [// Required: array, even empty
          {
            name: "TV",
            id: 40,
            items: [
              {
                name: "Samsung",
                id: 400,
                url: 'app/category/400'
              },
              {
                name: "LG",
                id: 401,
                url: 'app/category/401'
              },
              {
                name: "Sony",
                id: 402
              },
              {
                name: "Other - custom URL*",
                url: '/app/other'
              }
            ]
          },
        ]
      },
      {
        name: "Fashion & Accessories",
        id: 1,
        items: [// Required: array, even empty
          {
            name: "Men",
            id: 10,
            icon: 'basketball',
            items: [
              {
                name: "Clothing",
                id: 100
              },
              {
                name: "Footwear",
                id: 101
              },
              {
                name: "Watches",
                id: 102
              }
            ]
          },
          {
            name: "Women",
            id: 11,
            icon: 'bowtie',
            items: [// Required: array, even empty
              {
                name: "Clothing",
                id: 110
              },
              {
                name: "Footwear",
                id: 111
              },
              {
                name: "Watches",
                id: 112
              }
            ]
          },
          {
            name: "Kids",
            id: 12,
            icon: 'brush',
            items: []// Required: array, even empty
          }
        ]
      },
      {
        name: "Home & Living",
        id: 2,
        items: []// Required: array, even empty
      },
      {
        name: "Travel",
        id: 5,
        items: []// Required: array, even empty
      },
      {
        name: "Hotel",
        id: 6,
        items: []// Required: array, even empty
      },
      {
        name: "Food & Beverage",
        id: 7,
        items: []// Required: array, even empty
      }
    ];
  }

  getCategoryById(id: string) {
    let categories = [
      {
        name: "Electronics",
        id: "4"
      },
      {
        name: "TV",
        id: "40",
      },
      {
        name: "Samsung",
        id: "400",
        url: 'app/category/400'
      },
      {
        name: "LG",
        id: "401",
        url: 'app/category/401'
      },
      {
        name: "Sony",
        id: "402"
      },
      {
        name: "Other - custom URL*",
        id: "707",
        url: '/app/other'
      },
      {
        name: "Fashion & Accessories",
        id: "1"
      },
      {
        name: "Men",
        id: "10",
        icon: 'basketball',
      },
      {
        name: "Clothing",
        id: "100"
      },
      {
        name: "Footwear",
        id: "101"
      },
      {
        name: "Watches",
        id: "102"
      },
      {
        name: "Women",
        id: "11",
        icon: 'bowtie'
      },
      {
        name: "Clothing",
        id: "110"
      },
      {
        name: "Footwear",
        id: "111"
      },
      {
        name: "Watches",
        id: "112"
      },
      {
        name: "Kids",
        id: "12",
        icon: 'brush'
      },
      {
        name: "Home & Living",
        id: "2",
      },
      {
        name: "Travel",
        id: "5",
      },
      {
        name: "Hotel",
        id: "6",
      },
      {
        name: "Food & Beverage",
        id: "7",
      }
    ];

    let filtered = categories.filter((item) => {
      return item.id == id
    });

    return filtered.length > 0 ? filtered[0] : null;
  }
}
