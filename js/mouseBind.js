import GSAP from 'gsap';

class onMouseMouse {

constructor() {

    this.mouse = {
      x: 0,
      y: 0
    }

    this.settings = {
      // vertex
      uFrequency: {
        start: 0,
        end: 0
      },
      uAmplitude: {
        start: 0,
        end: 0
      },
      uDensity: {
        start: 0,
        end: 0
      },
      uStrength: {
        start: 0,
        end: 0
      },
      // fragment
      uDeepPurple: {  // max 1
        start: 0,
        end: 0
      },
      uOpacity: {  // max 1
        start: 1,
        end: 1
      }
    }
  }

  addEventListeners() {
    window.addEventListener('mousemove', this.onMouseMove.bind(this))
  }

  onMouseMove(event) {
    // play with it!
    // enable / disable / change x, y, multiplier …

    this.mouse.x = (event.clientX / this.viewport.width).toFixed(2) * 4
    this.mouse.y = (event.clientY / this.viewport.height).toFixed(2) * 2

    GSAP.to(this.mesh.material.uniforms.uFrequency, { value: this.mouse.x })
    GSAP.to(this.mesh.material.uniforms.uAmplitude, { value: this.mouse.x })
    GSAP.to(this.mesh.material.uniforms.uDensity, { value: this.mouse.y })
    GSAP.to(this.mesh.material.uniforms.uStrength, { value: this.mouse.y })
    // GSAP.to(this.mesh.material.uniforms.uDeepPurple, { value: this.mouse.x })
    // GSAP.to(this.mesh.material.uniforms.uOpacity, { value: this.mouse.y })

    console.info(`X: ${this.mouse.x}  |  Y: ${this.mouse.y}`)
  }
}