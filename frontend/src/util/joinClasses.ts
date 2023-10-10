const joinClasses = (...classNames: Array<string | boolean | undefined | null>): string => {
    return classNames
        .filter(Boolean)
        .join(' ')
};

export default joinClasses