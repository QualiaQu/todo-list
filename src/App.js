import {AddTaskButton} from './components/AddTaskButton'
import {QueryClient, QueryClientProvider} from "react-query";
import {TaskList} from "./components/TaskList";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <AddTaskButton/>
                <TaskList/>
            </div>
        </QueryClientProvider>
    );
}

export default App;