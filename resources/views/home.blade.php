@extends("layout.app")
@section('content')
    <div class="app-container" id="taskList">
        <h1 class="app-header">TO DO LIST</h1>
        <div class="add-task">
            <input type="text" autocomplete="off" placeholder="Add New Task" v-model="tasks.name" class="task-input">
            <input type="submit" value="" class="submit-task" title="Add Task">
        </div>
        <ul class="task-list">

        </ul>
    </div>
@endsection
