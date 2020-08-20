import Vue from 'vue'
import TodoList from './../components/TodoList.vue'

describe('MyComponent', () => {
    // 원시 컴포넌트 옵션을 검사합니다.
    it('has a default data', () => {
      expect(typeof TodoList.data).toBe('function')
      const defaultData = TodoList.data()
      expect(defaultData.editModal).toBe(false)
    })

    it('메소드 검사', () => {
        expect(typeof TodoList.methods).toBe('object')
        const defaultMethods = TodoList.methods
        const now = (new Date()).getTime()
        expect(typeof defaultMethods.formatDate(now)).toBe('string')
        expect(defaultMethods.formatDate(now)).toMatch(/(-|:)/i)
      })
})