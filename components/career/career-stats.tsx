import { Card, CardContent } from "@/components/ui/card";

interface StatsProps {
  stats: {
    icon: React.ReactNode;
    value: string;
    label: string;
    description: string;
  }[];
}

export default function CareerStats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="p-3 bg-green-100 rounded-full mb-4">
              {stat.icon}
            </div>
            <h3 className="text-3xl font-bold text-green-700">{stat.value}</h3>
            <p className="font-semibold mt-2">{stat.label}</p>
            <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
