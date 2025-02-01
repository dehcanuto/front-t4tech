import { describe, it, expect, jest } from '@jest/globals'
import { mount } from '@vue/test-utils'
import DataTable from '../BaseDataTable.vue'

describe('DataTable.vue', () => {
  const columns = [
    { label: 'Nome', field: 'full_name', sortable: true },
    { label: 'Time', field: 'team.full_name', sortable: false },
  ]

  const data = [
    { id: 1, first_name: 'LeBron', last_name: 'James', team: { full_name: 'Lakers' } },
    { id: 2, first_name: 'Stephen', last_name: 'Curry', team: { full_name: 'Warriors' } },
  ]

  it('renders the table with correct data', () => {
    const wrapper = mount(DataTable, {
      props: { data, columns, onSort: jest.fn(), onDelete: jest.fn() },
    })

    expect(wrapper.text()).toContain('LeBron James')
    expect(wrapper.text()).toContain('Stephen Curry')
    expect(wrapper.text()).toContain('Lakers')
    expect(wrapper.text()).toContain('Warriors')
  })

  it('calls onSort when clicking a sortable column', async () => {
    const onSort = jest.fn()
    const wrapper = mount(DataTable, {
      props: { data, columns, onSort, onDelete: jest.fn() },
    })

    await wrapper.find('th:first-child').trigger('click')

    expect(onSort).toHaveBeenCalledWith('full_name')
  })

  it('calls onDelete when clicking the delete button', async () => {
    const onDelete = jest.fn()
    const wrapper = mount(DataTable, {
      props: { data, columns, onSort: jest.fn(), onDelete },
    })

    await wrapper.find('button.bg-red-500').trigger('click')

    expect(onDelete).toHaveBeenCalledWith(1)
  })
})
