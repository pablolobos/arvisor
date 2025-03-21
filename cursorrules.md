# Cursor Rules

## Document References

When working with document references in Sanity:

1. **GROQ Query Structure**
   - Keep original reference fields (`_type`, `_ref`)
   - Use `@->` to expand references
   - Place expanded data in a named field
   ```groq
   members[] {
     _type,
     _ref,
     "member": @-> {
       _id,
       firstName
     }
   }
   ```

2. **TypeScript Types**
   - Match types exactly to GROQ query structure
   - Include reference structure in types
   ```typescript
   interface Props {
     members?: {
       _type: 'reference'
       _ref: string
       member: MemberType
     }[]
   }
   ```

3. **Component Implementation**
   - Access expanded data through the nested field
   - Handle null/undefined cases
   ```typescript
   {members?.map((memberRef) => {
     const member = memberRef.member;
     if (!member) return null;
     return <div>{member.firstName}</div>;
   })}
   ```

## Project Structure
- All Next.js components should be in `nextjs-app/app/components/`
- All Sanity schemas should be in `studio/src/schemaTypes/`
- Keep component imports relative when they're in the same directory
- Use `@/` imports for non-relative paths (e.g., `@/sanity/lib/utils`)

## Component Organization
- Page components go in `nextjs-app/app/`
- Reusable components go in `nextjs-app/app/components/`
- Block components (used in pageBuilder) go in `nextjs-app/app/components/`
- Utility functions go in `nextjs-app/sanity/lib/`

## Image Handling
- Always use `urlForImage` from `@/sanity/lib/utils`
- Handle both reference and expanded asset formats:
```typescript
export const urlForImage = (source: any) => {
  if (!source?.asset) return undefined;
  
  // Handle direct URLs
  if (source.asset.url) {
    return imageBuilder?.image(source.asset.url);
  }
  
  // Handle references
  if (source.asset._ref) {
    return imageBuilder?.image(source);
  }
  
  return undefined;
};
```

- Always check for asset existence before rendering:
```typescript
if (!block.image?.asset) return null;

const imageUrl = urlForImage(block.image)?.width(1920).height(1080).fit('crop').url();
if (!imageUrl) return null;
```

## Block Components
- Each block component should:
  1. Accept `block` and `index` props
  2. Handle its own type checking
  3. Handle null/undefined states
  4. Use proper image handling with urlForImage

## GROQ Queries
- Always expand image assets in queries:
```groq
image {
  ...,
  asset->,
  alt
}
```

## Type Safety
- Define proper types for all components
- Use TypeScript interfaces for block props
- Handle optional fields with null checks
- Use type assertions sparingly and only when necessary

## PageBuilder Pattern
- Use a single source of truth for block rendering
- Map block types to components explicitly
- Handle unknown block types gracefully
- Include proper type checking for blocks

## Types
- Never modify the generated types in `sanity.types.ts` directly
- Always update the Sanity schema definitions instead
- Run `sanity typegen generate` after schema changes to update types

## Image Handling
- Use the following pattern for image fields in schemas:
```ts
defineField({
    name: 'image',
    title: 'Image',
    type: 'image',
    options: {
        hotspot: true
    },
    fields: [
        {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
        }
    ]
})
```

- In GROQ queries, expand image assets with all necessary fields:
```groq
image {
    ...,
    asset->,
    alt
}
```

- In components, handle images with urlForImage and proper null checks:
```tsx
if (!block.image?.asset) return null

const imageUrl = urlForImage(block.image).width(1920).height(1080).fit('crop').url()
if (!imageUrl) return null

return (
    <Image
        src={imageUrl}
        alt={block.image?.alt || ''}
        // ... other props
    />
)
```

## GROQ Queries
- Expand references using `asset->` for images
- Use conditional projections with `_type == "something" =>` for union types
- Include `_type` and `_key` for array items

## Component Structure
- Use `block` prop for Sanity content blocks
- Include `index` prop for array items
- Handle optional fields with nullish checks

## Singletons
- Use `__experimental_actions` to limit operations
- Set up desk structure for single-instance documents
- Use `documentId` matching the schema name

## Page Builder
- Define allowed block types in schema
- Create separate components for each block type
- Use a mapping object to render blocks dynamically

## Example Patterns

### Schema Definition
```ts
export default defineType({
    name: 'blockName',
    title: 'Block Title',
    type: 'object',
    fields: [
        defineField({
            name: 'field',
            title: 'Field',
            type: 'string',
            validation: Rule => Rule.required()
        })
    ]
})
```

### Component Implementation
```ts
interface BlockProps {
    block: BlockType
    index: number
}

export default function Block({ block }: BlockProps) {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                {/* Content */}
            </div>
        </section>
    )
}
```

### GROQ Query
```groq
*[_type == "document"][0] {
    title,
    blocks[] {
        _type == "blockType" => {
            _type,
            _key,
            field,
            image {
                ...,
                asset->
            }
        }
    }
}
``` 

# Image Handling Best Practices

## Schema Definition
```ts
defineField({
    name: 'image',
    title: 'Image',
    type: 'image',
    options: {
        hotspot: true
    },
    fields: [
        {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
        }
    ]
})
```

## GROQ Query Pattern
For direct image fields:
```groq
image {
    _type,
    asset->,
    hotspot,
    crop,
    alt
}
```

For referenced documents with images:
```groq
"member": @-> {
    _id,
    firstName,
    lastName,
    picture {
        _type,
        asset->,
        hotspot,
        crop,
        alt
    }
}
```

## Image Component Implementation
1. **Next.js Image Component (for static dimensions)**:
```tsx
if (!block.image?.asset) return null;

const imageUrl = urlForImage(block.image)
    .width(1920)
    .height(1080)
    .fit('crop')
    .url();

if (!imageUrl) return null;

return (
    <Image
        src={imageUrl}
        alt={block.image.alt || ''}
        width={1920}
        height={1080}
        className="object-cover"
    />
);
```

2. **Next.js Image with Fill (for responsive/dynamic dimensions)**:
```tsx
if (!block.image?.asset) return null;

const imageUrl = urlForImage(block.image)
    .width(1920)
    .height(1080)
    .fit('crop')
    .url();

if (!imageUrl) return null;

return (
    <div className="relative aspect-[16/9]">
        <Image
            src={imageUrl}
            alt={block.image.alt || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
    </div>
);
```

3. **Regular img tag (fallback solution)**:
```tsx
if (!block.image?.asset) return null;

const imageUrl = urlForImage(block.image)
    .width(1920)
    .height(1080)
    .fit('crop')
    .url();

if (!imageUrl) return null;

return (
    <div className="relative aspect-[16/9]">
        <img
            src={imageUrl}
            alt={block.image.alt || ''}
            className="w-full h-full object-cover"
        />
    </div>
);
```

## Next.js Configuration
```js
// next.config.js
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/images/**',
            },
        ],
    },
}
```

## Troubleshooting Steps
1. Verify GROQ query includes all necessary image fields (asset->, hotspot, crop)
2. Check if image URLs are accessible directly in browser
3. Verify Next.js image domain configuration
4. Try regular img tag to isolate Next.js Image component issues
5. Check container dimensions and aspect ratios
6. Ensure proper null checks for asset and URL
7. Use browser dev tools Network tab to check image requests

## Common Gotchas
1. Missing asset-> in GROQ query
2. Missing container dimensions with fill mode
3. Missing sizes prop with fill mode
4. Not handling null asset cases
5. Complex nested div structure breaking layout
6. Missing aspect ratio container
7. Not checking generated URL before rendering 

## GROQ Query Formatting
- Always include commas between fields in objects
- Use proper indentation for nested structures
- For complex queries with multiple blocks, format like this:
```groq
_type == "blockType" => {
    _type,
    _key,
    field1,
    "renamedField": field2 {
        ...,
        asset->,
        nestedField
    },
    arrayField[] {
        _key,
        title,
        "expanded": @-> {
            _id,
            name
        }
    }
}
```
- Double-check commas after each object when nesting multiple levels
- Use consistent indentation to make structure clear
- Add line breaks between major sections

### Keep It Simple
1. For basic image URLs, just use:
```typescript
const imageUrl = urlForImage(image)?.url();
```

2. Only add transformations when needed:
```typescript
// When you need specific dimensions
const imageUrl = urlForImage(image)
    ?.width(400)
    .height(500)
    .fit('crop')
    .url();
```

3. Basic null checks are usually sufficient:
```typescript
if (!block.image?.asset) return null;
```

### Common Mistakes to Avoid
1. Over-complicating URL generation
2. Adding unnecessary transformations
3. Over-engineering the image component structure
4. Adding complex conditional logic for different image types

## GROQ Query Patterns

### Field Synchronization
When adding new fields to a schema, ensure they are added in three places:
1. Schema definition (in `studio/src/schemaTypes/`)
2. GROQ query field selections (in `sanity/lib/queries.ts`)
3. TypeScript types (automatically generated via `sanity typegen`)

Example workflow:
```ts
// 1. Schema Definition (studio/src/schemaTypes/documents/project.ts)
defineField({
    name: 'price',
    title: 'Precio (UF)',
    type: 'string',
}),
defineField({
    name: 'priceDetail',
    title: 'Detalle del precio',
    type: 'string',
})

// 2. GROQ Query Fields (sanity/lib/queries.ts)
const projectFields = `
  _id,
  name,
  price,
  priceDetail,
  // ... other fields
`

// 3. Use generated types from sanity.types.ts
import type { Project } from '@/sanity.types'
```

### Query Field Patterns
- Define reusable field selections as constants
```ts
const projectFields = `
  _id,
  name,
  "slug": slug.current,
  // ... other fields
`

export const projectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields}
  }
`)
```

- Keep field selections consistent across related queries
```ts
// Use same projectFields in both queries
export const allProjectsQuery = defineQuery(`
  *[_type == "project"] {
    ${projectFields}
  }
`)

export const singleProjectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields}
  }
`)
```

### Common Gotchas
1. Adding fields to schema but forgetting to add them to GROQ queries
2. Inconsistent field selections between list and detail queries
3. Not updating TypeScript types after schema changes
4. Missing field projections for nested objects or references

### Best Practices
1. Keep field selections DRY using shared constants
2. Always run `sanity typegen` after schema changes
3. Test queries in Vision tool before implementing in components
4. Use consistent field projection patterns across queries
5. Document field selection constants for reusability

# Sanity Image Type Handling

## Problem
When working with Sanity images in components, you might encounter type mismatches between Sanity's image structure and your component's expected props. This commonly happens because:

1. Sanity stores images with a complex structure (asset references, hotspots, crops)
2. Components typically need simple URLs
3. TypeScript will complain about the mismatch

## Solution Pattern

### 1. Keep Component Interface Simple
```typescript
interface GalleryProps {
    images: Array<{
        url: string
        alt: string
    }>
}
```

### 2. Transform Data at Page Level
```typescript
// In page component
const galleryImages = project.images?.map(image => ({
    url: urlForImage(image)?.url() || '',
    alt: image.alt || ''
})) || []

// Pass transformed data to component
<Gallery images={galleryImages} />
```

### 3. Use Proper GROQ Query
```groq
images[] {
    _key,
    _type,
    asset->,
    hotspot,
    crop,
    alt
}
```

## Best Practices

1. **Data Transformation Location**: Transform Sanity image data to URLs at the page level, not in presentational components
2. **Type Safety**: Use TypeScript interfaces that match your actual needs, not Sanity's internal structure
3. **Null Handling**: Always provide fallbacks for null/undefined values
4. **URL Generation**: Use `urlForImage` utility from Sanity for proper URL generation
5. **Component Separation**: Keep presentational components agnostic of Sanity's data structure

## Common Gotchas
1. Trying to use Sanity image objects directly in components
2. Missing asset expansion in GROQ queries (`asset->`)
3. Not handling null values in data transformation
4. Putting Sanity-specific logic in presentational components

## Example Implementation
```typescript
// Page Component
const galleryImages = project.images?.map(image => ({
    url: urlForImage(image)?.url() || '',
    alt: image.alt || ''
})) || []

// Gallery Component
interface GalleryProps {
    images: Array<{ url: string; alt: string }>
}

function Gallery({ images }: GalleryProps) {
    return images.map(image => (
        <Image src={image.url} alt={image.alt} />
    ))
}
```

This pattern keeps components clean and reusable while handling Sanity's data structure appropriately.