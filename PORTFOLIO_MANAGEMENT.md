# Portfolio Management Guide

Managing your portfolio is now much easier! All portfolio items are stored in a single JSON file that you can easily edit.

## Quick Start

1. **Edit the portfolio file**: `app/lib/portfolio.json`
2. **Add your images**: Place new images in `public/portfolio/`
3. **Save and refresh**: Changes appear automatically

## Adding a New Portfolio Item

Add a new object to the array in `app/lib/portfolio.json`:

```json
{
  "id": "23",
  "src": "/portfolio/your-new-image.png",
  "alt": "Description of the image",
  "title": "Project Title",
  "client": "Client Name",
  "metatags": ["Tag 1", "Tag 2", "Tag 3"],
  "hidden": false,
  "caseStudyUrl": "https://example.com"
}
```

### Field Descriptions

- **id**: Unique identifier (use a number as a string, e.g., "23")
- **src**: Path to image in `/public/portfolio/` folder (e.g., "/portfolio/my-image.png")
- **alt**: Alt text for accessibility
- **title**: Project title (shown prominently)
- **client**: Client name (shown below title)
- **metatags**: Array of tags (e.g., ["Product Design", "UX Design"])
- **aspectRatio**: (Optional) Not used in masonry layout - images automatically maintain their natural aspect ratio. You can omit this field entirely.
- **hidden**: Set to `true` to hide from portfolio, `false` to show
- **caseStudyUrl**: (Optional) URL to live site or case study

## Updating an Existing Item

1. Open `app/lib/portfolio.json`
2. Find the item by `id` or search for the image filename
3. Update any fields you want to change
4. Save the file

## Removing an Item

**Option 1: Hide it** (recommended - keeps data for later)
```json
{
  "id": "5",
  "hidden": true
}
```

**Option 2: Delete it** - Remove the entire object from the array

## Replacing an Image

1. **Keep the same filename**: Replace the image file in `public/portfolio/` with the same name
2. **Or update the JSON**: Change the `src` field to point to a new image file

## About Aspect Ratios

**Good news!** You don't need to worry about aspect ratios. The masonry layout automatically preserves each image's natural aspect ratio, so you can use images of any size or shape. The `aspectRatio` field in the JSON is optional and not actually used - feel free to omit it entirely.

## Example: Adding a New Project

```json
[
  {
    "id": "23",
    "src": "/portfolio/new-project.png",
    "alt": "New Project - Dashboard Design",
    "title": "Revolutionary Dashboard",
    "client": "Tech Startup",
    "metatags": ["Dashboard Design", "UX Design", "Product Design"],
    "hidden": false,
    "caseStudyUrl": "https://example.com"
  }
]
```

**Note**: The `aspectRatio` field is optional and can be omitted - images will automatically display at their natural aspect ratio.

## Tips

- **Keep IDs unique**: Don't reuse IDs
- **Use descriptive alt text**: Important for accessibility
- **Order matters**: Items appear in the order they're listed in the JSON
- **Test after changes**: Refresh your browser to see updates
- **Backup before major changes**: Copy the JSON file before making big edits

## File Structure

```
app/
└── lib/
    └── portfolio.json    ← Edit this file!

public/
└── portfolio/           ← Add images here
    ├── image1.png
    ├── image2.png
    └── ...
```

That's it! Much easier than editing code. 🎉

