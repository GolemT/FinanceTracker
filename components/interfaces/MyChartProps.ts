import Transaction from "./transactions";
import Tag from "./tags";

export default interface MyChartProps {
    transactions: Transaction[];
    tags: Tag[]
}