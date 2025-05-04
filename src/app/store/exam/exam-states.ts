export type examState = 'instructions' | 'started' | 'get score' | 'results' | 'closed'

export interface ExamStates {
    state:examState,
    isExamOpen:boolean
}
