# Project Rules & Customizations

## Image Asset Management Protocol
1. **Direct Public Asset Placement**: When generating images for UI components or marketing sections, place the target image files directly into `public/images/<category>/` using clean, descriptive filenames (e.g., `beach.png`, `park.png`) rather than temporary artifact IDs or background shell copy operations.
2. **Fail-Safe Fallbacks**: `<img onError>` handlers must use category-appropriate fallbacks or CSS gradients (`fallbackGradient`) rather than hardcoding static apartment placeholders.
3. **Build & Import Verification**: Before completing any image or feature addition task, run `npx tsc --noEmit` to verify all imported UI components (`@/components/ui/*`) exist and compile without missing file errors.
