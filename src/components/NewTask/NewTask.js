
import React from 'react';
import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHTTP from '../../hooks/use-HTTP';

const NewTask = (props) => {

  const { isLoading, error, sendRequest: sendTaskRequest } = useHTTP();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: 'https://react-http-requests-4811b-default-rtdb.firebaseio.com/tasks.json',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { task: taskText },
      },
      createTask.bind(null, taskText)
    );
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
