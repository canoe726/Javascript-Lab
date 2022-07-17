import { useCallback, useState } from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { scaleOrdinal } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'

export interface ResultValue {
  average: number;
  success: number;
  total: number;
}

export interface DataResult {
  testsetTitle: string; 
  configTitle: string;
  testResultAverage: number;
  testResultNumOfSuccess: number;
  testResultNumOfTotal: number;
  execTime: number;
  createdAt: string;
}

interface DataTestResultGraphProps {
  data: DataResult[];
  showDataKeys: string[];
}

interface DataKey {
  key: string;
  active: boolean;
}

const data: DataResult[] = [
  {
    testsetTitle: '테스트',
    configTitle: '옵션 1',
    testResultAverage: 1,
    testResultNumOfSuccess: 40,
    testResultNumOfTotal: 40,
    execTime: 0.17,
    createdAt: '2021-05-03:11:22:33'
  },
  {
    testsetTitle: '테스트',
    configTitle: '옵션 2',
    testResultAverage: 1,
    testResultNumOfSuccess: 32,
    testResultNumOfTotal: 32,
    execTime: 0.16,
    createdAt: '2021-05-03:11:22:34'
  },
  {
    testsetTitle: '테스트',
    configTitle: '옵션 3',
    testResultAverage: 0.4,
    testResultNumOfSuccess: 40,
    testResultNumOfTotal: 100,
    execTime: 0.15,
    createdAt: '2021-05-03:11:22:35'
  },
  {
    testsetTitle: '테스트',
    configTitle: '옵션 4',
    testResultAverage: 0.6,
    testResultNumOfSuccess: 6,
    testResultNumOfTotal: 10,
    execTime: 0.27,
    createdAt: '2021-05-03:11:22:36'
  },
  {
    testsetTitle: '테스트',
    configTitle: '옵션 5',
    testResultAverage: 0.67,
    testResultNumOfSuccess: 20,
    testResultNumOfTotal: 30,
    execTime: 0.10,
    createdAt: '2021-05-03:11:22:37'
  }
]

const DataTestResultGraph: React.FC<DataTestResultGraphProps> = ({
  data,
  showDataKeys
}) => {
  const colors = scaleOrdinal(schemeCategory10).range();
  const [isActiveKey, setIsActiveKey] = useState<boolean[]>(Array.from({length: showDataKeys.length}, () => true))
  const [, updateState] = useState<Object>();
  const forceUpdate = useCallback(() => updateState({}), []);

  return (
    <div className="p-8">
      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="configTitle" />
          <YAxis />
          <Tooltip />
          <Legend onClick={(e) => {
            const idx = showDataKeys.indexOf(e.value)
            isActiveKey[idx] = !isActiveKey[idx]
            setIsActiveKey(isActiveKey)
            forceUpdate()
          }}/>
          {showDataKeys.map((dataKey, idx) => {
            return (
              <Line
                key={idx}
                display={isActiveKey[idx] ? 'block' : 'none'}
                type="monotone"
                dataKey={dataKey}
                stroke={colors[idx]}
                strokeWidth="2" />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DataTestResultGraph
