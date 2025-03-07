export interface Product {
    _id: string;
    Id: string;
    IsClearance: boolean;
    Category: string;
    IsNew: boolean;
    Url: string;
    Reviews: {
      ReviewsUrl: string;
      ReviewCount: number;
      AverageRating: number;
    };
    NameWithoutBrand: string;
    Name: string;
    Images: {
      PrimarySmall: string;
      PrimaryMedium: string;
      PrimaryLarge: string;
      PrimaryExtraLarge: string;
      ExtraImages: {
        Title: string;
        Src: string;
      }[];
    };
    SizesAvailable: {
      ZIPPER: string[];
    };
    Colors: Color[];
    DescriptionHtmlSimple: string;
    SuggestedRetailPrice: number;
    Brand: Brand;
    ListPrice: number;
    FinalPrice: number;
  }
  export interface Color {
    ColorCode: string;
      ColorName: string;
      ColorChipImageSrc: string;
      ColorPreviewImageSrc: string;
  }
  
  export interface Brand {
    Id: string;
      Url: string;
      ProductsUrl: string;
      LogoSrc: string;
      Name: string;
  }




