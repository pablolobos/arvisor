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