import { Card, Title, Text, Grid, Col } from "@tremor/react";

export default function Example() {
  return (
    <div className="border-separate border-spacing-4">
      <main>
        <Title>Dashboard</Title>
      
        <Grid numItemsLg={6} className="gap-4 mx-6 mt-6 border-spacing-4">
          {/* Main section */}
          <Col numColSpanLg={4}>
            <Card className="h-full">
              <div className="h-60" />
            </Card>
          </Col>

          {/* KPI sidebar */}
          <Col numColSpanLg={2}>
            <div className="space-y-6">
              <Card>
                <div className="h-24" />
              </Card>
              <Card>
                <div className="h-24" />
              </Card>
              <Card>
                <div className="h-24" />
              </Card>
            </div>
          </Col>
        </Grid>

    
      </main>
      <Grid numItemsMd={10} className="mt-5 mb-5 mx-5 gap-2 border-spacing-4">
        <Card>
          {/* Placeholder to set height */}
          <div className="h-24" />
        </Card>
        <Card>
          {/* Placeholder to set height */}
          <div className="h-24" />
        </Card>
        <Card>
          {/* Placeholder to set height */}
          <div className="h-24" />
        </Card>
        <Card>
          {/* Placeholder to set height */}
          <div className="h-24" />
        </Card>
        <Card>
          {/* Placeholder to set height */}
          <div className="h-24" />
        </Card>
        <Col numColSpanLg={5}>
        <Card>
          {/* Placeholder to set height */}
          <div className="h-24" />
        </Card>
        </Col>
      </Grid>

    </div>
  );
}
