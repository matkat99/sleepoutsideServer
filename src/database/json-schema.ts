// User schema
export const UserSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "User",
  description: "",
  type: "object",
  properties: {
    _id: { type: "string" },
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      minLength: 6,
      maxLength: 100,
      description:
        "The password of the user, must be at least six characters long and no more than one hundred characters long"
    },
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50,
      description:
        "The name of the user, must be at least two characters long and no more than 50 characters long"
    },
    address: {
      type: "object",
      properties: {
        street: {
          type: "string",
          minLength: 10,
          maxLength: 100,
          description:
            "The street address of the user, must not be blank and must be at least ten characters long and no more than one hundred characters long"
        },
        city: {
          type: "string",
          minLength: 5,
          maxLength: 50,
          description:
            "The city of the user, must not be blank and must be at least five characters long and no more than fifty characters long"
        },
        state: {
          type: "string",
          enum: [
            "AL",
            "AK",
            "AZ",
            "AR",
            "CA",
            "CO",
            "CT",
            "DE",
            "DC",
            "FL",
            "GA",
            "HI",
            "ID",
            "IL",
            "IN",
            "IA",
            "KS",
            "KY",
            "LA",
            "ME",
            "MD",
            "MA",
            "MI",
            "MN",
            "MS",
            "MO",
            "MT",
            "NE",
            "NV",
            "NH",
            "NJ",
            "NM",
            "NY",
            "NC",
            "ND",
            "OH",
            "OK",
            "OR",
            "PA",
            "RI",
            "SC",
            "SD",
            "TN",
            "TX",
            "UT",
            "VT",
            "VA",
            "WA",
            "WV",
            "WI",
            "WY"
          ],
          description:
            "The state of the user, must not be blank and must be one of the following states: AL, AK, AZ, AR, CA, CO, CT, DE, DC, FL, GA, HI, ID, IL, IN, IA, KS, KY, LA, ME, MD, MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, NM, NY, NC, ND, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VT, VA, WA, WV, WI, WY"
        },
        zipCode: {
          type: "string",
          minLength: 5,
          maxLength: 10,
          pattern: "^\\d{5}(-\\d{4})?$",
          description:
            "The zip code of the user, must not be blank and must be a valid zip code"
        },
        country: {
          type: "string",
          minLength: 2,
          maxLength: 30,
          pattern: "^\\w+$",
          description:
            "The country of the user, must not be blank and must be a valid country"
        }
      }
    },
    phoneNumbers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: { type: "string" },
          number: { type: "string" }
        }
      }
    },
    cart: {
      type: "array",
      items: {
        type: "object",
        properties: {
          productId: { type: "string" },
          productName: { type: "string" },
          price: { type: "number" },
          finalPrice: { type: "number" },
          productImageSrc: { type: "string" },
          productUrl: { type: "string" },
          productCategory: { type: "string" },
          productColor: {
            type: "object",
            properties: {
              colorCode: { type: "string" }
            }
          },
          productSize: { type: "string" }
        }
      }
    },
    createdAt: { type: "date" },
    modifiedAt: { type: "date" }
  },
  required: ["email", "password", "name", "createdAt", "modifiedAt"]
};

export const Alert = {
  title: "Alert",
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "The ID of the alert"
    },
    title: {
      type: "string",
      description: "The title of the alert, must not be blank"
    },
    description: {
      type: "string",
      description: "The description of the alert, must not be blank"
    },
    type: {
      type: "string",
      description: "The type of the alert"
    },
    status: {
      type: "string",
      enum: ["open", "closed"],
      description: "The status of the alert, must be one of open or closed"
    },
    createdOn: {
      type: "date",
      description: "The date the alert was created"
    },
    modifiedOn: {
      type: "date",
      description: "The date the alert was last modified"
    }
  },
  required: ["id", "title", "description", "status"]
};
