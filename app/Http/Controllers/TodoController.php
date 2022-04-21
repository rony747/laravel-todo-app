<?php

namespace App\Http\Controllers;

use App\Models\TodoModel;
use Illuminate\Http\Request;
use LDAP\Result;

class TodoController extends Controller
{
    function todoInder()
    {
    }
    function getTodos()
    {
        $todoAll = json_decode(TodoModel::orderBy('todo_done', 'asc')->get());
        return $todoAll;
    }

    function addTodo(Request $req)
    {
        $todoText = $req->todoText;
        $todoStatus = $req->todoStatus;
        $result = TodoModel::insert(['todo_text' => $todoText, 'todo_done' => $todoStatus]);

        if ($result == true) {
            return 1;
        } else {
            return 0;
        }
    }

    function todoComplete(Request $req)
    {
        $todoId = $req->id;
        $currentTodo = TodoModel::where('id', '=', $todoId)->first();
        if ($currentTodo->todo_done == 0) {
            $result = TodoModel::where('id', '=', $todoId)->update(['todo_done' => 1]);
        } else {
            $result = TodoModel::where('id', '=', $todoId)->update(['todo_done' => 0]);
        }

        if ($result == true) {
            return 1;
        } else {
            return 0;
        }
    }

    function todoDelete(Request $req)
    {
        $todoId = $req->id;
        $result = TodoModel::where('id', '=', $todoId)->delete();
        if ($result == true) {
            return 1;
        } else {
            return 0;
        }
    }
}
