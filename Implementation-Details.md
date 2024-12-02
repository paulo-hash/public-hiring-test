## What has been done?

#### 1. New modules:
- **Ingredients**: Represents an ingredient.
- **Product**: Represents the name of the product and a list of ingredients as defined in the README.md.
- **CarbonFootPrint**: Computes and stores the carbon footprint.

#### 2. Carbon emission factor:
- **CarbonEmissionFactors service**: Added the `findByName` method, used in the computation of the carbon footprint.
- **CarbonEmissionFactors entity**: Added an index on the `name` column of the table to speed up queries on the name (due to the `findByName` method).

#### 3. Testing:
- **Adding `--runInBand`**: Fixed the concurrency issue in testing, despite potentially slowing down the tests.
- **Carbon Footprint and Product Service Unit Tests**
- **Carbon Footprint e2e Test**
- **Seed Dev Data**: Added `PRODUCTS` to test products.

#### 4. Other functionalities:
- **Unit Converter**: Converts grams (gr), pounds (lbs), or ounces (oz) into kilograms (kg).
- **Using Swagger**: To document the API.

#### 5. How it works:
- **CarbonFootPrint**: To address the requirement, the `CarbonFootPrint` module was created to manage the computation of the carbon footprint. It writes the results into the `carbon_foot_print` table. This module performs the computation based on the ID of a product that already exists (throws an error if it doesn't) or a product passed as an argument. If the product doesn't already exist, it creates it first.

- **Product**: Manages product creation. It ensures that the `product` table contains only one row per product name. When a new product is entered, its ingredients are written into the `ingredients` table using a cascade.  
  - The product must contain at least one ingredient.  
  - The product name must not already exist in the `product` table.
