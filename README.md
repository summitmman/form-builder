# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

- Use [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc) for performing the same type checking from the command line, or for generating d.ts files for SFCs.

### TODO:
- [X] Render any html element
- [X] Render custom vue component
- [X] Pass props
- [X] Pass events
- [X] v-model support (only supported for custom vue components and not native html ones)
- [X] multiple v-model support
- [X] dynamic text support
- [X] dynamic props support
- [ ] manage typeof string dependency
- [ ] Support IForm to give initial set of ref variables
- [ ] v-if
- [ ] v-for

### Findings
Ref when passed through an object and not directly returned to the template does not get opened by vue
Hence when vue encounters a variable which is not opened it simply prints the __value which is the value with double quotes
To resolve this we had to create Renderer components which simply return the ref variables inside the object to the template or open it ourselves using the reactive construct