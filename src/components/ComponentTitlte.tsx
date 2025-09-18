
const ComponentTitle = ({ title, subTitle }: { title: string, subTitle: string }) => {
    return (
        <div className="text-center lg:w-1/3 mx-auto space-y-3.5 mb-15">
            <h2 className="text-3xl font-semibold">{title}</h2>
            <p className="text-sm text-secondary-foreground">{subTitle}</p>
        </div>
    );
};

export default ComponentTitle;