# NDE Tunnel Experience: Visual & Sensory Blueprint

Based on scientific research, psychological studies, and hundreds of firsthand accounts, the "tunnel" phase of a Near-Death Experience (NDE) shares highly consistent visual and sensory characteristics. 

This document serves as a blueprint for translating the NDE tunnel into a high-end, immersive parallax/WebGL web experience.

## Visual Characteristics

### 1. The Structure & Shape
- **The Void vs. The Cylinder:** Accounts often describe the tunnel not as a solid physical tube (like a subway tunnel), but rather as a vast, enclosed void, a deep conical space, or a "curtain-like" area.
- **Geometric Walls:** As the visual processing system changes, many experiencers report subtle structural geometries on the periphery of their vision—such as faint spirals, gratings, or vortex-like swirling textures.
- **Color Palette:** The walls of the tunnel are overwhelmingly described as absolute, deep, velvety darkness (pure blacks, deep indigos, or voids of color).

### 2. The Light at the End
- **Brilliance:** The defining feature of the tunnel is the destination: a light at the end that is described as "more brilliant than the sun" or "a million times brighter than normal light."
- **Softness:** Despite its immense brightness, the light is universally described as *warm, inviting, and painless to look at*. It does not glare or blind; it glows with a radiant, pure white or golden hue.
- **Growth:** As the experiencer moves forward, the light grows steadily from a pinprick into an all-encompassing glow that eventually swallows the darkness.

## Sensory & Kinesthetic Characteristics

### 1. The Sensation of Motion
- **Magnetic Pull:** Experiencers rarely feel like they are "walking" or propelling themselves. Instead, there is a distinct sensation of being *drawn, pulled, or swept up* by a vacuum-like or magnetic force toward the light.
- **High Speed & Weightlessness:** The movement is often described as traveling at incredibly high speeds (sometimes "faster than the speed of light"), yet paradoxically paired with a feeling of complete weightlessness, floating, and profound stillness/peace.

### 2. Auditory Accompaniments
- Many describe hearing a distinct sound right as they enter the tunnel or while traveling through it. This is often characterized as a **rushing sound, a wind, a high-pitched hum, a buzzing, or a frequency-like ringing**.

---

## Translation to Code (Parallax/WebGL Blueprint)

When you or Claude are ready to build this, here is how we can map these experiences to code mechanics:

> [!TIP]
> **Implementation Strategy**
> - **GSAP ScrollTrigger / Parallax:** Map the scroll position to the Z-axis (depth) of the camera. Scrolling down pulls the user "forward" through the tunnel.
> - **Three.js / WebGL:** 
>   - Create a long cylindrical or conical mesh with a dark, subtle swirling noise texture applied to the inside (to mimic the geometric/spiral walls).
>   - Place a massive, blooming PointLight or glowing Sprite at the far end of the Z-axis. Use post-processing (Bloom effect) to make the light incredibly radiant without crushing the surrounding colors.
> - **Easing/Physics:** Use a subtle ease-in effect so that as the user scrolls, the speed of the "pull" increases exponentially, mimicking the magnetic draw.
> - **Audio API:** Link the scroll velocity to the volume/pitch of a subtle, low-frequency hum or rushing wind audio file.
