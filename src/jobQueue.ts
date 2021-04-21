import events from "events"

export const tasks = {
  active: 0,
  complete: 0,
  error: 0,
  total: 0,
}

export const jobs = new events.EventEmitter();

export const addTask = async (task: () => Promise<any>): Promise<any> => {

  tasks.active++;
  tasks.total++;
  jobs.emit('start');

  try {
    const result = await task();

    tasks.active--;
    tasks.complete++;
    jobs.emit('success', result)

    return result;
    
  } catch (error) {

    console.error(error)

    tasks.active--;
    tasks.error++;
    jobs.emit('error', error)

    throw error
    
  }

};
