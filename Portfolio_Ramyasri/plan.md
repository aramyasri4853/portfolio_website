Implementation Plan - Reference Portfolio Inspired Redesign
Recreate the style, color system, background elements, and specific animations from the reference portfolio (Lekhana R's portfolio) to modernize your personal branding.

User Review Required
IMPORTANT

The new design features a highly polished Light Theme by default (with a clean Dark Theme toggle option) built on a soft grayish-lavender grid background, with coral, violet, and teal gradient highlights.

Key Visual Specs
Background: Soft light lavender-gray (#FAF9FC) with an elegant fine grid overlay (rgba(124, 58, 237, 0.04)) and three large organic floating color blobs (Teal, Violet, and Coral/Orange) that float and rotate slowly in the background.
Heading Gradients: A gradient mask spanning Coral (#ff6b6b) to Violet (#7c3aed) to Cyber Teal (#06b6d4).
Typography: Outfit / Plus Jakarta Sans for a clean, modern aesthetic.
UI Details:
Available Pill Badge: A pulsing green dot container in the hero section saying "AVAILABLE FOR OPPORTUNITIES".
Frosted Navigation Pill Hover: Soft translucent purple pill highlights on navbar hovers.
Card Accent Numbers: Subtle, transparent backdrop index numbers (01, 02, 03) layered behind the project card text.
Contact Glows: Smooth purple ring glows when input elements are selected.
Proposed Changes
[Component Name: Color Palette & Variables]
[MODIFY] 
style.css
Update :root variables to define the new reference color palette:
css
:root {
    --color-coral: #ff6b6b;
    --color-violet: #7c3aed;
    --color-teal: #06b6d4;
    --color-bg-light: #faf9fc;
    --color-bg-dark: #07060b;
    --color-text-light: #0f172a; /* Slate 900 */
    --color-text-muted-light: #4b5563; /* Slate 600 */
    --color-text-dark: #f8fafc;
    --color-text-muted-dark: #94a3b8;
    
    /* Theme mapped vars */
    --bg-color: var(--color-bg-light);
    --text-color: var(--color-text-light);
    --text-muted: var(--color-text-muted-light);
    --card-bg: rgba(255, 255, 255, 0.65);
    --border-color: rgba(124, 58, 237, 0.06);
    --primary-gradient: linear-gradient(135deg, var(--color-coral) 0%, var(--color-violet) 50%, var(--color-teal) 100%);
}
Add a subtle grid pattern background using a dual-gradient overlay.
Update the floating color blobs to match the Teal, Violet, and Coral shades.
Design index card numbers (.card-index) to float behind project card contents.
Implement custom outline focuses on inputs and forms.
[Component Name: Layout structure]
[MODIFY] 
index.html
Add the available-status pulsing badge to the Hero section:
html
<div class="available-badge">
    <span class="pulse-dot"></span>
    <span>Available for Opportunities</span>
</div>
Update Project Cards with index numbering spans: <span class="project-num">01</span>.
Ensure text hierarchy matches Lekhana R's portfolio style (e.g. coral/orange role subtitle).
Verification Plan
Automated/Local Tests
Ensure no HTML structure errors.
Verify variables reference the new scheme and build properly.
Manual Verification
Confirm background grid scale and responsiveness.
Test that the light-to-dark theme toggle retains proper contrast.
Verify the available badge pulses smoothly.