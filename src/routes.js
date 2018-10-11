import HomePage from './components/HomePage.vue';
import AddTodo from './components/AddTodo.vue';
import TasksList from './components/TasksList'
import EditTask from './components/EditTask'

export default [


    {
        path: '/',
        component: HomePage,
        meta:{guest:true},
    },

    {
        path:'/addtodo',
        component: AddTodo,
        meta:{guest:true},

    },
    {
        path:'/tasks/list',
        component: TasksList,
        meta:{guest:true},
    },
    {
        path:'/task/edit/:id',
        component: EditTask,
        meta:{guest:true},
    }

]