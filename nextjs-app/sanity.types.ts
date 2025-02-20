/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Video = {
  _type: "video";
  url?: string;
  title?: string;
  description?: string;
};

export type Location = {
  _type: "location";
  address?: string;
  mapUrl?: string;
};

export type CallToAction = {
  _type: "callToAction";
  heading?: string;
  text?: string;
  buttonText?: string;
  link?: Link;
};

export type Link = {
  _type: "link";
  linkType?: "href" | "page" | "post";
  href?: string;
  page?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "page";
  };
  post?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "post";
  };
  openInNewTab?: boolean;
};

export type InfoSection = {
  _type: "infoSection";
  heading?: string;
  subheading?: string;
  content?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      linkType?: "href" | "page" | "post";
      href?: string;
      page?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "page";
      };
      post?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "post";
      };
      openInNewTab?: boolean;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
};

export type BlockContent = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  }>;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
  listItem?: "bullet" | "number";
  markDefs?: Array<{
    linkType?: "href" | "page" | "post";
    href?: string;
    page?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "page";
    };
    post?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "post";
    };
    openInNewTab?: boolean;
    _type: "link";
    _key: string;
  }>;
  level?: number;
  _type: "block";
  _key: string;
}>;

export type Home = {
  _id: string;
  _type: "home";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  heroImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  expertName?: string;
  expertRole?: string;
  expertImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  expertInstagram?: string;
  whatsappNumber?: string;
  featuredProject?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "project";
  };
};

export type Project = {
  _id: string;
  _type: "project";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  subtitle?: string;
  location?: {
    address?: string;
    mapUrl?: string;
  };
  projectType?: "terreno" | "departamento" | "casa";
  price?: string;
  priceDetail?: string;
  downPayment?: string;
  downPaymentDetail?: string;
  balance?: string;
  balanceDetail?: string;
  monthlyFee?: number;
  tags?: Array<string>;
  discountPercentage?: number;
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  description?: BlockContent;
  amenities?: {
    cerco?: boolean;
    camino_interior?: boolean;
    urbanizado?: boolean;
    electricidad?: boolean;
    aguaPotable?: boolean;
    security?: boolean;
    playground?: boolean;
    parking?: boolean;
    pool?: boolean;
    laundry?: boolean;
    terrace?: boolean;
  };
  details?: {
    bedrooms?: number;
    bathrooms?: number;
    squareMeters?: number;
  };
  viewer3dUrl?: string;
  videos?: Array<{
    _key: string;
  } & Video>;
  ogImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
};

export type Page = {
  _id: string;
  _type: "page";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  heading?: string;
  subheading?: string;
  pageBuilder?: Array<{
    _key: string;
  } & CallToAction | {
    _key: string;
  } & InfoSection>;
};

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  content?: BlockContent;
  excerpt?: string;
  coverImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  date?: string;
  author?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "person";
  };
};

export type Person = {
  _id: string;
  _type: "person";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  firstName?: string;
  lastName?: string;
  picture?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type Settings = {
  _id: string;
  _type: "settings";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  ogImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    metadataBase?: string;
    _type: "image";
  };
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type SanityAssistInstructionTask = {
  _type: "sanity.assist.instructionTask";
  path?: string;
  instructionKey?: string;
  started?: string;
  updated?: string;
  info?: string;
};

export type SanityAssistTaskStatus = {
  _type: "sanity.assist.task.status";
  tasks?: Array<{
    _key: string;
  } & SanityAssistInstructionTask>;
};

export type SanityAssistSchemaTypeAnnotations = {
  _type: "sanity.assist.schemaType.annotations";
  title?: string;
  fields?: Array<{
    _key: string;
  } & SanityAssistSchemaTypeField>;
};

export type SanityAssistOutputType = {
  _type: "sanity.assist.output.type";
  type?: string;
};

export type SanityAssistOutputField = {
  _type: "sanity.assist.output.field";
  path?: string;
};

export type SanityAssistInstructionContext = {
  _type: "sanity.assist.instruction.context";
  reference?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "assist.instruction.context";
  };
};

export type AssistInstructionContext = {
  _id: string;
  _type: "assist.instruction.context";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  context?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: null;
    level?: number;
    _type: "block";
    _key: string;
  }>;
};

export type SanityAssistInstructionUserInput = {
  _type: "sanity.assist.instruction.userInput";
  message?: string;
  description?: string;
};

export type SanityAssistInstructionPrompt = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  } | {
    _key: string;
  } & SanityAssistInstructionFieldRef | {
    _key: string;
  } & SanityAssistInstructionContext | {
    _key: string;
  } & SanityAssistInstructionUserInput>;
  style?: "normal";
  listItem?: never;
  markDefs?: null;
  level?: number;
  _type: "block";
  _key: string;
}>;

export type SanityAssistInstructionFieldRef = {
  _type: "sanity.assist.instruction.fieldRef";
  path?: string;
};

export type SanityAssistInstruction = {
  _type: "sanity.assist.instruction";
  prompt?: SanityAssistInstructionPrompt;
  icon?: string;
  title?: string;
  userId?: string;
  createdById?: string;
  output?: Array<{
    _key: string;
  } & SanityAssistOutputField | {
    _key: string;
  } & SanityAssistOutputType>;
};

export type SanityAssistSchemaTypeField = {
  _type: "sanity.assist.schemaType.field";
  path?: string;
  instructions?: Array<{
    _key: string;
  } & SanityAssistInstruction>;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | Video | Location | CallToAction | Link | InfoSection | BlockContent | Home | Project | Page | Post | Person | Slug | Settings | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | SanityAssistInstructionTask | SanityAssistTaskStatus | SanityAssistSchemaTypeAnnotations | SanityAssistOutputType | SanityAssistOutputField | SanityAssistInstructionContext | AssistInstructionContext | SanityAssistInstructionUserInput | SanityAssistInstructionPrompt | SanityAssistInstructionFieldRef | SanityAssistInstruction | SanityAssistSchemaTypeField;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./sanity/lib/queries.ts
// Variable: getPageQuery
// Query: *[_type == 'page' && slug.current == $slug][0]{    _id,    _type,    name,    slug,    heading,    subheading,    "pageBuilder": pageBuilder[]{      ...,      _type == "callToAction" => {        ...,          link {      ...,      _type == "link" => {        "page": page->slug.current,        "post": post->slug.current        }      },      }    },  }
export type GetPageQueryResult = {
  _id: string;
  _type: "page";
  name: string | null;
  slug: Slug | null;
  heading: string | null;
  subheading: string | null;
  pageBuilder: Array<{
    _key: string;
    _type: "callToAction";
    heading?: string;
    text?: string;
    buttonText?: string;
    link: {
      _type: "link";
      linkType?: "href" | "page" | "post";
      href?: string;
      page: string | null;
      post: string | null;
      openInNewTab?: boolean;
    } | null;
  } | {
    _key: string;
    _type: "infoSection";
    heading?: string;
    subheading?: string;
    content?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        linkType?: "href" | "page" | "post";
        href?: string;
        page?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "page";
        };
        post?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "post";
        };
        openInNewTab?: boolean;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
  }> | null;
} | null;
// Variable: allPostsQuery
// Query: *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {      _id,  "status": select(_originalId in path("drafts.**") => "draft", "published"),  "title": coalesce(title, "Untitled"),  "slug": slug.current,  excerpt,  coverImage,  "date": coalesce(date, _updatedAt),  "author": author->{firstName, lastName, picture},  }
export type AllPostsQueryResult = Array<{
  _id: string;
  status: "draft" | "published";
  title: string | "Untitled";
  slug: string | null;
  excerpt: string | null;
  coverImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  date: string;
  author: {
    firstName: string | null;
    lastName: string | null;
    picture: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    } | null;
  } | null;
}>;
// Variable: morePostsQuery
// Query: *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {      _id,  "status": select(_originalId in path("drafts.**") => "draft", "published"),  "title": coalesce(title, "Untitled"),  "slug": slug.current,  excerpt,  coverImage,  "date": coalesce(date, _updatedAt),  "author": author->{firstName, lastName, picture},  }
export type MorePostsQueryResult = Array<{
  _id: string;
  status: "draft" | "published";
  title: string | "Untitled";
  slug: string | null;
  excerpt: string | null;
  coverImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  date: string;
  author: {
    firstName: string | null;
    lastName: string | null;
    picture: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    } | null;
  } | null;
}>;
// Variable: postQuery
// Query: *[_type == "post" && slug.current == $slug] [0] {    content[]{    ...,    markDefs[]{      ...,        link {      ...,      _type == "link" => {        "page": page->slug.current,        "post": post->slug.current        }      }    }  },      _id,  "status": select(_originalId in path("drafts.**") => "draft", "published"),  "title": coalesce(title, "Untitled"),  "slug": slug.current,  excerpt,  coverImage,  "date": coalesce(date, _updatedAt),  "author": author->{firstName, lastName, picture},  }
export type PostQueryResult = {
  content: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs: Array<{
      linkType?: "href" | "page" | "post";
      href?: string;
      page?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "page";
      };
      post?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "post";
      };
      openInNewTab?: boolean;
      _type: "link";
      _key: string;
      link: null;
    }> | null;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  _id: string;
  status: "draft" | "published";
  title: string | "Untitled";
  slug: string | null;
  excerpt: string | null;
  coverImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  date: string;
  author: {
    firstName: string | null;
    lastName: string | null;
    picture: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    } | null;
  } | null;
} | null;
// Variable: postPagesSlugs
// Query: *[_type == "post" && defined(slug.current)]  {"slug": slug.current}
export type PostPagesSlugsResult = Array<{
  slug: string | null;
}>;
// Variable: pagesSlugs
// Query: *[_type == "page" && defined(slug.current)]  {"slug": slug.current}
export type PagesSlugsResult = Array<{
  slug: string | null;
}>;
// Variable: allProjectsQuery
// Query: *[_type == "project" && defined(slug.current)] | order(_createdAt desc) {    _id,    name,    "slug": slug.current,    subtitle,    location,    price,    priceDetail,    downPaymentDetail,    monthlyFee,    tags,    discountPercentage,    images[] {      asset->,      alt    }  }
export type AllProjectsQueryResult = Array<{
  _id: string;
  name: string | null;
  slug: string | null;
  subtitle: string | null;
  location: {
    address?: string;
    mapUrl?: string;
  } | null;
  price: string | null;
  priceDetail: string | null;
  downPaymentDetail: string | null;
  monthlyFee: number | null;
  tags: Array<string> | null;
  discountPercentage: number | null;
  images: Array<{
    asset: {
      _id: string;
      _type: "sanity.imageAsset";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      originalFilename?: string;
      label?: string;
      title?: string;
      description?: string;
      altText?: string;
      sha1hash?: string;
      extension?: string;
      mimeType?: string;
      size?: number;
      assetId?: string;
      uploadId?: string;
      path?: string;
      url?: string;
      metadata?: SanityImageMetadata;
      source?: SanityAssetSourceData;
    } | null;
    alt: string | null;
  }> | null;
}>;
// Variable: projectQuery
// Query: *[_type == "project" && slug.current == $slug][0] {      _id,  name,  "slug": slug.current,  subtitle,  location {    address,    mapUrl  },  projectType,  price,  priceDetail,  downPayment,  downPaymentDetail,  balance,  balanceDetail,  monthlyFee,  tags,  discountPercentage,  images[] {    _key,    _type,    asset->,    hotspot,    crop,    alt  },  description,  amenities,  details,  viewer3dUrl,  videos[] {    url,    title,    description  },  ogImage {    asset->,    alt,    hotspot,    crop  }  }
export type ProjectQueryResult = {
  _id: string;
  name: string | null;
  slug: string | null;
  subtitle: string | null;
  location: {
    address: string | null;
    mapUrl: string | null;
  } | null;
  projectType: "casa" | "departamento" | "terreno" | null;
  price: string | null;
  priceDetail: string | null;
  downPayment: string | null;
  downPaymentDetail: string | null;
  balance: string | null;
  balanceDetail: string | null;
  monthlyFee: number | null;
  tags: Array<string> | null;
  discountPercentage: number | null;
  images: Array<{
    _key: string;
    _type: "image";
    asset: {
      _id: string;
      _type: "sanity.imageAsset";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      originalFilename?: string;
      label?: string;
      title?: string;
      description?: string;
      altText?: string;
      sha1hash?: string;
      extension?: string;
      mimeType?: string;
      size?: number;
      assetId?: string;
      uploadId?: string;
      path?: string;
      url?: string;
      metadata?: SanityImageMetadata;
      source?: SanityAssetSourceData;
    } | null;
    hotspot: SanityImageHotspot | null;
    crop: SanityImageCrop | null;
    alt: string | null;
  }> | null;
  description: BlockContent | null;
  amenities: {
    cerco?: boolean;
    camino_interior?: boolean;
    urbanizado?: boolean;
    electricidad?: boolean;
    aguaPotable?: boolean;
    security?: boolean;
    playground?: boolean;
    parking?: boolean;
    pool?: boolean;
    laundry?: boolean;
    terrace?: boolean;
  } | null;
  details: {
    bedrooms?: number;
    bathrooms?: number;
    squareMeters?: number;
  } | null;
  viewer3dUrl: string | null;
  videos: Array<{
    url: string | null;
    title: string | null;
    description: string | null;
  }> | null;
  ogImage: {
    asset: {
      _id: string;
      _type: "sanity.imageAsset";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      originalFilename?: string;
      label?: string;
      title?: string;
      description?: string;
      altText?: string;
      sha1hash?: string;
      extension?: string;
      mimeType?: string;
      size?: number;
      assetId?: string;
      uploadId?: string;
      path?: string;
      url?: string;
      metadata?: SanityImageMetadata;
      source?: SanityAssetSourceData;
    } | null;
    alt: string | null;
    hotspot: SanityImageHotspot | null;
    crop: SanityImageCrop | null;
  } | null;
} | null;
// Variable: projectSlugsQuery
// Query: *[_type == "project" && defined(slug.current)][].slug.current
export type ProjectSlugsQueryResult = Array<string | null>;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "\n  *[_type == 'page' && slug.current == $slug][0]{\n    _id,\n    _type,\n    name,\n    slug,\n    heading,\n    subheading,\n    \"pageBuilder\": pageBuilder[]{\n      ...,\n      _type == \"callToAction\" => {\n        ...,\n        \n  link {\n      ...,\n      _type == \"link\" => {\n        \"page\": page->slug.current,\n        \"post\": post->slug.current\n        }\n      }\n,\n      }\n    },\n  }\n": GetPageQueryResult;
    "\n  *[_type == \"post\" && defined(slug.current)] | order(date desc, _updatedAt desc) {\n    \n  _id,\n  \"status\": select(_originalId in path(\"drafts.**\") => \"draft\", \"published\"),\n  \"title\": coalesce(title, \"Untitled\"),\n  \"slug\": slug.current,\n  excerpt,\n  coverImage,\n  \"date\": coalesce(date, _updatedAt),\n  \"author\": author->{firstName, lastName, picture},\n\n  }\n": AllPostsQueryResult;
    "\n  *[_type == \"post\" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {\n    \n  _id,\n  \"status\": select(_originalId in path(\"drafts.**\") => \"draft\", \"published\"),\n  \"title\": coalesce(title, \"Untitled\"),\n  \"slug\": slug.current,\n  excerpt,\n  coverImage,\n  \"date\": coalesce(date, _updatedAt),\n  \"author\": author->{firstName, lastName, picture},\n\n  }\n": MorePostsQueryResult;
    "\n  *[_type == \"post\" && slug.current == $slug] [0] {\n    content[]{\n    ...,\n    markDefs[]{\n      ...,\n      \n  link {\n      ...,\n      _type == \"link\" => {\n        \"page\": page->slug.current,\n        \"post\": post->slug.current\n        }\n      }\n\n    }\n  },\n    \n  _id,\n  \"status\": select(_originalId in path(\"drafts.**\") => \"draft\", \"published\"),\n  \"title\": coalesce(title, \"Untitled\"),\n  \"slug\": slug.current,\n  excerpt,\n  coverImage,\n  \"date\": coalesce(date, _updatedAt),\n  \"author\": author->{firstName, lastName, picture},\n\n  }\n": PostQueryResult;
    "\n  *[_type == \"post\" && defined(slug.current)]\n  {\"slug\": slug.current}\n": PostPagesSlugsResult;
    "\n  *[_type == \"page\" && defined(slug.current)]\n  {\"slug\": slug.current}\n": PagesSlugsResult;
    "\n  *[_type == \"project\" && defined(slug.current)] | order(_createdAt desc) {\n    _id,\n    name,\n    \"slug\": slug.current,\n    subtitle,\n    location,\n    price,\n    priceDetail,\n    downPaymentDetail,\n    monthlyFee,\n    tags,\n    discountPercentage,\n    images[] {\n      asset->,\n      alt\n    }\n  }\n": AllProjectsQueryResult;
    "\n  *[_type == \"project\" && slug.current == $slug][0] {\n    \n  _id,\n  name,\n  \"slug\": slug.current,\n  subtitle,\n  location {\n    address,\n    mapUrl\n  },\n  projectType,\n  price,\n  priceDetail,\n  downPayment,\n  downPaymentDetail,\n  balance,\n  balanceDetail,\n  monthlyFee,\n  tags,\n  discountPercentage,\n  images[] {\n    _key,\n    _type,\n    asset->,\n    hotspot,\n    crop,\n    alt\n  },\n  description,\n  amenities,\n  details,\n  viewer3dUrl,\n  videos[] {\n    url,\n    title,\n    description\n  },\n  ogImage {\n    asset->,\n    alt,\n    hotspot,\n    crop\n  }\n\n  }\n": ProjectQueryResult;
    "\n  *[_type == \"project\" && defined(slug.current)][].slug.current\n": ProjectSlugsQueryResult;
  }
}
