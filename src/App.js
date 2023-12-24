import {AddTask} from './components/AddTask'
import {QueryClient, QueryClientProvider} from "react-query";
import {TaskList} from "./components/TaskList";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <AddTask/>
                <TaskList/>
            </div>
        </QueryClientProvider>
    );
}

export default App;