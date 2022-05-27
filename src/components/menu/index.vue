<script lang="jsx">
import { ref } from 'vue'

export default {
  setup (props, { slots, expose }) {
    const menuNodeRef = ref(null)

    const showRightMenu = (e) => {
      e.stopPropagation()
      e.preventDefault()

      const menuElement = menuNodeRef.value
      menuElement.style.display = 'block'
      menuElement.style.left = e.pageX + 'px'
      menuElement.style.top = e.pageY + 'px'
    }

    const closeMenu = () => {
      menuNodeRef.value && (menuNodeRef.value.style.display = 'none')
    }

    expose({
      menuNodeRef
    })

    return () => {
      const defaultList = slots.default()
      const menuList = slots.menu()

      return (
        <div tabindex="0" onContextmenu={ showRightMenu } onBlur={ closeMenu }>
          { defaultList }
          <div class="menu-wrap" ref={ menuNodeRef }>
            {
              menuList.map(node => {
                return <div class="menu-item">{ node }</div>
              })
            }
          </div>
        </div>
      )
    }
  }
}
</script>

<style lang="less" scoped>
  .menu-wrap {
    display: none;
    position: fixed;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,.15);
    border-radius: 4px;
    min-width: 70px;

    .menu-item {
      padding: 8px 0;
      min-width: 90px;
      color: rgba(0,0,0,.65);
      transition: all .3s;
      border-bottom: 1px solid #e8e8e8;
      &:hover {
        background-color: #e6f7ff;
      }
    }

  }
</style>
